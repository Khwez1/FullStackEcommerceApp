"use client";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct } from "./actions";

function CreateProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchErrorMessage = searchParams.get("errorMessage");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        setErrorMessage("No auth token found. Please log in.");
        router.push("/login");
        return;
      }

      const result = await createProduct(
        name,
        description,
        Number(price),
        token
      );
      console.log("🔁 Result from createProduct:", result);

      if (result.success) {
        router.push("/dashboard/products");
      } else {
        if (result.error === "Unauthorized") {
          document.cookie = "token=; Max-Age=0";
          router.push("/login");
        } else {
          setErrorMessage(result.error ?? "Unknown error occurred");
        }
      }
    } catch (err) {
      console.error("❌ Unexpected error in handleSubmit:", err);
      setErrorMessage("Something went wrong. Try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <Box className="flex flex-1 min-h-screen justify-center items-center">
      <FormControl
        isInvalid={!!errorMessage || !!searchErrorMessage}
        className="p-4 border rounded-lg max-w-[500px] w-full border-outline-300 m-2 bg-white"
      >
        <VStack space="xl">
          <Heading className="text-typography-900">Create product</Heading>

          <VStack space="xs">
            <Text className="text-typography-500">Name</Text>
            <Input>
              <InputField value={name} onChangeText={setName} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text className="text-typography-500">Description</Text>
            <Input>
              <InputField
                value={description}
                onChangeText={setDescription}
                type="text"
              />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text className="text-typography-500">Price</Text>
            <Input>
              <InputField value={price} onChangeText={setPrice} type="text" />
            </Input>
          </VStack>

          {(errorMessage || searchErrorMessage) && (
            <Text className="text-red-600">
              {errorMessage || searchErrorMessage}
            </Text>
          )}

          <Button onPress={handleSubmit} disabled={isSubmitting}>
            <ButtonText>
              {isSubmitting ? "Saving..." : "Save product"}
            </ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
}

export default CreateProductPage;
