"use client";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Box } from "@/components/ui/box";
import { handleLogin, handleSignup } from "./actions";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('errorMessage');

  return (
    <Box className="flex flex-1 min-h-screen justify-center items-center">
      <FormControl
        isInvalid={!!errorMessage}
        className="p-4 border rounded-lg max-w-[500px] w-full border-outline-300 m-2 bg-white"
      >
        <VStack space="xl">
          <Heading className="text-typography-900">Login</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input>
              <InputField value={email} onChangeText={setEmail} type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField
                value={password}
                onChangeText={setPassword}
                type={showPassword ? "text" : "password"}
              />
              <InputSlot
                className="pr-3"
                onPress={() =>
                  setShowPassword((showState) => {
                    return !showState;
                  })
                }
              >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}
          <HStack space="sm">
            <Button className="flex-1" variant="outline" onPress={() => handleLogin(email, password)}>
              <ButtonText className="">Sign In</ButtonText>
            </Button>
            <Button className="flex-1" onPress={() => handleSignup(email, password)}>
              <ButtonText className="text-typography-0">Sign Up</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </FormControl>
    </Box>
  );
}
