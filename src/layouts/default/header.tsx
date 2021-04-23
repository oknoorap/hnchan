import { FC, useMemo } from "react";
import { Flex, Box, Link, Image, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import shuffle from "lodash/shuffle";

type HeaderProps = {
  title: string;
  description: string;
};

export const links = [
  {
    label: "top",
    href: "/",
  },
  {
    label: "newest",
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
  description = "",
}) => {
  const {
    query: { threadId },
    pathname,
  } = useRouter();
  const banner = useMemo(() => {
    const num = Array.from({ length: 15 }, (_, i) => i + 1);
    const bannerIndex = shuffle(num);
    return `/banners/${bannerIndex[0]}.png`;
  }, []);

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
          src={banner}
          fallbackSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAQAAACWCMVLAAAAxklEQVR42u3SMQ0AAAzDsJU/6aGo1MOGECUHBZEAY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWBgLjIWxMBYYC2NhLDAWxsJYYCy2PT0vAGXiVAUcAAAAAElFTkSuQmCC"
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
          mb={description && 2}
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          letterSpacing="-2px"
        >
          {pathname !== "/" && (
            <Box as="span" mr="1">
              {threadId ? `/thread/${threadId}` : pathname}/ -
            </Box>
          )}
          <Box as="span">{title}</Box>
        </Heading>
        {description && (
          <Box w="30%" mx="auto" fontSize="x-small" mt="2">
            {description}
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
