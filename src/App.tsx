import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Input,
  Button,
  Text,
  Link,
  Image,
  VStack,
  HStack,
  useClipboard,
  Divider,
} from "@chakra-ui/react";
import duckduckgoLogo from "./assets/duckduckgo_logo.svg";
import "./App.css";

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [showGeneratedEmail, setShowGeneratedEmail] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const { hasCopied, onCopy } = useClipboard(generatedEmail);

  // Retrieve from localStorage when the app loads
  useEffect(() => {
    const duckEmailInput = localStorage.getItem("duck_email");
    const recipientEmailInput = localStorage.getItem("recipient_email");
    if (duckEmailInput) setInput1(duckEmailInput);
    if (recipientEmailInput) setInput2(recipientEmailInput);
  }, []);

  // Update localStorage when inputs change
  useEffect(() => {
    localStorage.setItem("duck_email", input1);
  }, [input1]);

  useEffect(() => {
    localStorage.setItem("recipient_email", input2);
  }, [input2]);

  const handleClick = () => {
    if (input1.includes("@") && input2.includes("@")) {
      const alias = `${input2.replace("@", "_at_")}_${input1}`;
      setGeneratedEmail(alias);
      setShowGeneratedEmail(true);
    } else {
      setShowGeneratedEmail(false);
    }
  };

  return (
    <ChakraProvider>
      <VStack spacing={8} align="center" className="card" padding="4">
        {/* Logo and Header */}
        <Box as="a" href="https://vitejs.dev" target="_blank">
          <Image
            src={duckduckgoLogo}
            alt="DuckDuckGo logo"
            className="logo"
            boxSize="120px"
          />
        </Box>

        <Heading size="lg" textAlign="center">
          DuckAlias Sender
        </Heading>

        {/* Introduction */}
        <Box textAlign="center" maxW="450px">
          <Text fontSize="md" color="gray.600">
            Use your pre-generated DuckDuckGo aliases to send emails. Enter your
            DuckDuckGo email and the recipient's email below to generate an
            alias.
          </Text>
        </Box>

        <Divider borderColor="gray.300" />

        {/* Input Fields */}
        <VStack spacing={4} width="100%" maxW="400px">
          <Input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Your @duck.com email"
            focusBorderColor="orange.400"
            size="lg"
          />

          <Input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Recipient's email"
            focusBorderColor="orange.400"
            size="lg"
          />

          <Button
            colorScheme="orange"
            size="lg"
            onClick={handleClick}
            isFullWidth
          >
            Generate Alias
          </Button>
        </VStack>

        {/* Generated Alias */}
        {showGeneratedEmail && (
          <Box
            textAlign="center"
            p={4}
            borderWidth={1}
            borderRadius="lg"
            shadow="md"
            width="100%"
            maxW="400px"
          >
            <Text fontSize="lg" color="gray.800" mb={2}>
              Send the email to this alias:
            </Text>
            <HStack justify="center">
              <Text fontWeight="bold" color="blue.500">
                {generatedEmail}
              </Text>
              <Button size="sm" colorScheme="blue" onClick={onCopy}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </HStack>
          </Box>
        )}

        {/* Footer */}
        <Box
          p={4}
          borderWidth={1}
          borderRadius="md"
          textAlign="center"
          width="100%"
          maxW="400px"
          bg="gray.50"
        >
          <Text fontSize="sm" color="gray.600">
            This is not an official tool by DuckDuckGo. It's{" "}
            <Link
              href="https://github.com/hadyrashwan/duckduckgo-sender-alias"
              isExternal
              color="orange.500"
            >
              open-source
            </Link>{" "}
            and doesn't collect your data.
          </Text>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
