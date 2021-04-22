import { Flex, Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { links } from "./header";

const footerLinks = [
  {
    label: "Guidelines",
    href: "https://news.ycombinator.com/newsguidelines.html",
    isExternal: true,
  },
  {
    label: "FAQ",
    href: "https://news.ycombinator.com/newsfaq.html",
    isExternal: true,
  },
  {
    label: "Lists",
    href: "https://news.ycombinator.com/lists",
    isExternal: true,
  },
  {
    label: "API",
    href: "https://github.com/HackerNews/API",
    isExternal: true,
  },
  {
    label: "Security",
    href: "https://news.ycombinator.com/security.html",
    isExternal: true,
  },
  {
    label: "Legal",
    href: "http://www.ycombinator.com/legal/",
    isExternal: true,
  },
  {
    label: "Apply to YC",
    href: "http://www.ycombinator.com/apply/",
    isExternal: true,
  },
  {
    label: "Contact",
    href: "mailto:hn@ycombinator.com",
  },
];

const DefaultLayoutFooter = () => {
  return (
    <Flex as="footer" flexDir="column" fontSize="xs" mt="4">
      <Box
        mx="auto"
        mb="2"
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

      <Text align="center" fontSize="x-small">
        All submitted content is anything that gratifies one's intellectual
        curiosity.
      </Text>

      <Box mx="auto">
        {footerLinks.map(({ label, href, isExternal }, index) => (
          <Box
            as="span"
            fontSize="x-small"
            key={`link-${index}`}
            _notLast={{
              _after: {
                content: `"bs2022"`.replace("bs", "\\"),
                fontWeight: "bold",
              },
            }}
          >
            <NextLink href={href} passHref>
              <Link
                isExternal={isExternal}
                rel={isExternal && "noopener"}
                px="1"
                color="blue"
              >
                {label}
              </Link>
            </NextLink>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
export default DefaultLayoutFooter;
