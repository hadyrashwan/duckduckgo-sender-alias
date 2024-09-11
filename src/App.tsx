import { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Input, Button, Text, Link, Image, VStack, HStack, useClipboard, Divider, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import duckduckgoLogo from './assets/DuckAlias_sender_512x512-removebg-preview-transformed.webp';
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [showGeneratedEmail, setShowGeneratedEmail] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const { hasCopied, onCopy } = useClipboard(generatedEmail);
  const { colorMode } = useColorMode();

  // Retrieve from localStorage when the app loads
  useEffect(() => {
    const storedInput1 = localStorage.getItem('duck_input1');
    const storedInput2 = localStorage.getItem('duck_input2');
    if (storedInput1) setInput1(storedInput1);
    if (storedInput2) setInput2(storedInput2);
  }, []);

  // Update localStorage when inputs change
  useEffect(() => {
    localStorage.setItem('duck_input1', input1);
  }, [input1]);

  useEffect(() => {
    localStorage.setItem('duck_input2', input2);
  }, [input2]);

  const handleClick = () => {
    if (input1.includes('@') && input2.includes('@')) {
      const alias = `${input2.replace('@', '_at_')}_${input1}`;
      setGeneratedEmail(alias);
      setShowGeneratedEmail(true);
    } else {
      setShowGeneratedEmail(false);
    }
  };

  // Define green color scheme
  const greenColorScheme = {
    light: {
      textColor: 'green.800',
      boxBgColor: 'green.50',
      buttonColorScheme: 'green',
      dividerColor: 'green.200',
    },
    dark: {
      textColor: 'white.200',
      boxBgColor: 'green.900',
      buttonColorScheme: 'green',
      dividerColor: 'green.700',
    },
  };

  // Get color scheme based on the current color mode
  const colors = useColorModeValue(greenColorScheme.light, greenColorScheme.dark);

  return (
    <ChakraProvider>
      <VStack spacing={8} align="center" className="card" padding="4">
        {/* Logo and Header */}
        <Box as="a" href="https://vitejs.dev" target="_blank">
          <Image src={duckduckgoLogo} alt="DuckDuckGo logo" className="logo" boxSize="260px" />
        </Box>

        <Heading size="lg" textAlign="center">
          DuckAlias Sender
        </Heading>

        {/* Introduction */}
        <Box textAlign="center" maxW="450px">
          <Text fontSize="md" textAlign="center">
            Use your pre-generated DuckDuckGo aliases to send emails. Enter your
            DuckDuckGo email and the recipient's email below to generate an
            alias.
          </Text>
        </Box>

        <Divider borderColor={colors.dividerColor} />

        {/* Input Fields */}
        <VStack spacing={4} width="100%" maxW="400px">
          <Input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Your @duck.com email"
            focusBorderColor="green.400"
            size="lg"
          />

          <Input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Recipient's email"
            focusBorderColor="green.400"
            size="lg"
          />

          <Button
            colorScheme="green"
            size="lg"
            onClick={handleClick}
            isFullWidth
          >
            Generate Alias
          </Button>
        </VStack>

        {/* Generated Alias */}
        {showGeneratedEmail && (
          <Box textAlign="center" p={4} borderWidth={1} borderRadius="lg" shadow="md" width="100%" maxW="400px" bg={colors.boxBgColor}>
            <Text fontSize="lg" color={colors.textColor} mb={2}>
              Send the email to this alias:
            </Text>
            <HStack justify="center" spacing={4}>
              <Text fontWeight="bold" color="green.500" fontSize="lg">
                {generatedEmail}
              </Text>
              <Button size="sm" colorScheme={colors.buttonColorScheme} onClick={onCopy}>
                <Icon as={hasCopied ? CheckIcon : CopyIcon} />
              </Button>
            </HStack>
          </Box>
        )}

        {/* Footer */}
        <Box p={4} borderWidth={1} borderRadius="md" textAlign="center" width="100%" maxW="400px" bg={colors.boxBgColor}>
          <Text fontSize="sm" color={colors.textColor}>
            This is not an official tool by DuckDuckGo. It's{' '}
            <Link href="https://github.com/hadyrashwan/duckduckgo-sender-alias" isExternal color="green.500">
              open-source
            </Link>{' '}
            and doesn't collect your data.
          </Text>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
