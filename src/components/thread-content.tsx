import { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type ThreadContentProps = BoxProps & {
  isHtml?: boolean;
  preContent?: ReactNode;
};

const ThreadContent: FC<ThreadContentProps> = ({
  children,
  preContent,
  isHtml = false,
  ...props
}) => {
  return (
    <Box fontSize="small" p="4" {...props}>
      {preContent}
      {!isHtml && children}
      {isHtml && (
        <Box
          dangerouslySetInnerHTML={{ __html: children as string }}
          sx={{ p: { mb: 2 } }}
        />
      )}
    </Box>
  );
};

export default ThreadContent;
