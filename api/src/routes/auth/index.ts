import { Router } from "express";

import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "../../db/usersSchema";
import { validateData } from "../../middleware/validation";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const createUserSchema = createInsertSchema(usersTable).omit({
  role: true,
});

export const loginSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values(data)
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      });

    res.status(201).json({ message: "user was created", user });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
      
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    //create a jwt
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

export default router;
