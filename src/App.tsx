import { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Input, Button, Text, Link, Image, VStack, HStack, Divider, Icon, useClipboard, useColorModeValue } from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import duckduckgoLogo from './assets/DuckAlias_sender_512x512-removebg-preview-transformed.webp';
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [showGeneratedEmail, setShowGeneratedEmail] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const { hasCopied, onCopy } = useClipboard(generatedEmail);

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

  // Set CSS variables for colors
  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', colors.textColor);
    document.documentElement.style.setProperty('--box-bg-color', colors.boxBgColor);
    document.documentElement.style.setProperty('--button-bg-color', colors.buttonColorScheme);
    document.documentElement.style.setProperty('--button-text-color', colors.textColor);
  }, [colors]);

 return (
    <ChakraProvider>
      <Box className="fullscreen-container">
        <VStack spacing={8} align="center" className="card" padding={4} maxWidth="100%" width="100%">
          {/* Logo and Header */}
          <Box as="a" href="https://github.com/hadyrashwan/duckduckgo-sender-alias" target="_blank">
            <Image src={duckduckgoLogo} alt="DuckDuckGo logo" className="logo" boxSize={"200px"} />
          </Box>

          <Heading size="lg" textAlign="center">
            DuckAlias Sender
          </Heading>

          {/* Introduction */}
          <Box textAlign="center" maxW="450px" width="80%" px={4}>
            <Text>
              Use your pre-generated DuckDuckGo aliases to send emails. Enter your
              DuckDuckGo email and the recipient's email below to generate an
              alias.
            </Text>
          </Box>

          <Divider className="divider"  width="80%" />

          {/* Input Fields */}
          <VStack spacing={4} width="80%" maxW="400px" px={4}>
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
              // width="100%"
            >
              Generate Alias
            </Button>
          </VStack>

          {/* Generated Alias */}
          {showGeneratedEmail && (
            <Box className="email-box" width="80%" maxW="400px" px={4}>
              <Text className="email-text">
                Send the email to this alias:
              </Text>
              <HStack justify="center" width="80%">
                <Text className="email-value"  maxW="calc(80% - 40px)">
                  {generatedEmail}
                </Text>
                <Button className="copy-button" onClick={onCopy} flexShrink={0}>
                  <Icon as={hasCopied ? CheckIcon : CopyIcon} />
                </Button>
              </HStack>
            </Box>
          )}

          {/* Footer */}
          <Box className="footer" width="80%" px={4}>
            <Text className="footer-text" textAlign="center">
              This is not an official tool by DuckDuckGo. However,  It's{' '}
              <Link href="https://github.com/hadyrashwan/duckduckgo-sender-alias" isExternal color="green.500">
                open-source
              </Link>{' '}
              and doesn't collect your data.
            </Text>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
