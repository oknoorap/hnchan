import { FC } from "react";
import { Flex, Box, Link, Image, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type HeaderProps = {
  title: string;
  desc: string;
};

export const links = [
  {
    label: "top",
    href: "/",
  },
  {
    label: "news",
    href: "/n",
  },
  {
    label: "ask",
    href: "/a",
  },
  {
    label: "show",
    href: "/s",
  },
  {
    label: "jobs",
    href: "/j",
  },
  {
    label: "submit",
    href: "https://news.ycombinator.com/submit",
    isExternal: true,
  },
];

const DefaultLayoutHeader: FC<HeaderProps> = ({
  title = "Untitled",
  desc = "",
}) => {
  const { pathname } = useRouter();
  return (
    <Flex as="header" flexDir="column" fontSize="xs" mb="4">
      <Box
        as="nav"
        mx="auto"
        mb="4"
        _before={{ content: '"["' }}
        _after={{ content: '"]"' }}
      >
        {links.map(({ label, href, isExternal }, index) => (
          <Box
            as="span"
            key={`link-${index}`}
            _notLast={{
              _after: {
                content: '"/"',
                mx: "1",
              },
            }}
          >
            <NextLink href={href} passHref>
              <Link isExternal={isExternal} rel={isExternal && "noopener"}>
                {label}
              </Link>
            </NextLink>
          </Box>
        ))}
      </Box>
      <Box mx="auto" mb="2">
        <Image
          w="300"
          h="100"
          src="/images/banner.png"
          fallbackSrc="/images/banner.png"
          border="1px"
          borderColor="black"
        />
      </Box>

      <Box
        w="85%"
        pb="2"
        mx="auto"
        mb="2"
        textAlign="center"
        borderBottom="1px"
        borderColor="gray.300"
      >
        <Heading
          mb={desc && 2}
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          letterSpacing="-2px"
        >
          {pathname !== "/" && (
            <Box as="span" mr="1">
              {pathname}/ -
            </Box>
          )}
          <Box as="span">{title}</Box>
        </Heading>
        {desc && (
          <Box w="30%" mx="auto" fontSize="x-small" mt="2">
            {desc}
          </Box>
        )}
      </Box>

      <Flex justifyContent="center" w="30%" mx="auto">
        <Heading
          as="h2"
          fontSize="xl"
          display="inline"
          _before={{ content: '"["' }}
          _after={{ content: '"]"' }}
        >
          <Link
            href="https://news.ycombinator.com/submit"
            isExternal
            rel="noopener"
            color="blue"
          >
            Start a New Thread
          </Link>
        </Heading>
      </Flex>
    </Flex>
  );
};

export default DefaultLayoutHeader;
