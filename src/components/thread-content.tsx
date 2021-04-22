import { FC, ReactNode } from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";

type ThreadContentProps = BoxProps & {
  isHtml?: boolean;
  preContent?: ReactNode;
  isPopover?: boolean;
};

const ThreadContent: FC<ThreadContentProps> = ({
  children,
  preContent,
  isHtml = false,
  isPopover = false,
  ...props
}) => {
  return (
    <Box fontSize="small" p="4" {...props}>
      {preContent}
      {!isHtml && children}
      {isHtml && (
        <Text
          noOfLines={isPopover ? 5 : null}
          dangerouslySetInnerHTML={{ __html: children as string }}
          sx={{ p: { mb: 2 } }}
        />
      )}
    </Box>
  );
};

export default ThreadContent;
