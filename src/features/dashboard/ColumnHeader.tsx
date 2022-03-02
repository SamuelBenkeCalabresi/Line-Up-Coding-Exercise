import { Text } from "grommet";
import { colors } from "../../constants";

interface ColumnHeaderProps {
  /** The column's title */
  title: string;
}

const ColumnHeader = ({ title }: ColumnHeaderProps) => (
  <Text color={colors.primary} weight="bold">
    {title}
  </Text>
);

export default ColumnHeader;
