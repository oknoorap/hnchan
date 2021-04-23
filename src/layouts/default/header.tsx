import { FC } from "react";
import { Flex, Box, Link, Image, Heading } from "@chakra-ui/react";
import Head from "next/head";
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
  const num = Array.from({ length: 15 }, (_, i) => i + 1);
  const bannerIndex = shuffle(num);
  const banner = `/banners/${bannerIndex[0]}.png`;

  return (
    <>
      <Head>
        <link rel="prefetch" href="/banners/1.png" />
        <link rel="prefetch" href="/banners/2.png" />
        <link rel="prefetch" href="/banners/3.png" />
        <link rel="prefetch" href="/banners/4.png" />
        <link rel="prefetch" href="/banners/5.png" />
        <link rel="prefetch" href="/banners/6.png" />
        <link rel="prefetch" href="/banners/7.png" />
        <link rel="prefetch" href="/banners/8.png" />
        <link rel="prefetch" href="/banners/9.png" />
        <link rel="prefetch" href="/banners/10.png" />
        <link rel="prefetch" href="/banners/11.png" />
        <link rel="prefetch" href="/banners/12.png" />
        <link rel="prefetch" href="/banners/13.png" />
        <link rel="prefetch" href="/banners/14.png" />
        <link rel="prefetch" href="/banners/15.png" />
      </Head>

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
            shadow="sm"
          />
        </Box>

        <Box
          w="85%"
          pb="2"
          mx="auto"
          mb="2"
          textAlign="center"
          borderBottom="1px"
          borderColor="#d9bfb7"
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
    </>
  );
};

export default DefaultLayoutHeader;
