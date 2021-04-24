import { Flex, Box, Link, Text, Select, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { useStyle } from "hooks/use-style";

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
  const { pathname } = useRouter();
  const { style, styles, changeStyle } = useStyle();
  return (
    <Flex as="footer" flexDir="column" fontSize="xs" mt="2">
      <Flex
        mb="4"
        pb="2"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box
          bgColor={styles.boxColor}
          borderWidth="0 1px 1px 0"
          borderColor={styles.borderColor}
          py="1"
          px="2"
        >
          <Button
            size="xs"
            fontSize="xs"
            fontWeight="normal"
            rounded="none"
            color="black"
            bgColor="white"
            border="1px"
            borderColor="gray"
            disabled={pathname.includes("/thread")}
          >
            Load More
          </Button>
        </Box>
        <Flex alignItems="center">
          <Box as="label" htmlFor="theme-style" fontSize="sm">
            Style:
          </Box>
          <Select
            id="theme-style"
            bgColor="white"
            border="1px"
            borderColor="gray"
            size="xs"
            ml="1"
            defaultValue={style}
            onChange={changeStyle}
            _focus={{ outline: "none" }}
          >
            <option value="yotsuba-new">Yotsuba</option>
            <option value="yotsuba-b-new">Yotsuba B</option>
            <option value="futaba-new">Futaba</option>
            <option value="burichan-new">Burichan</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="photon">Photon</option>
          </Select>
        </Flex>
      </Flex>
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
                color={styles.linkBrightColor}
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
