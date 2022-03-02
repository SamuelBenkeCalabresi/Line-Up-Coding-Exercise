import { useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import {
  Pagination,
  Box,
  Text,
  Avatar,
  DataTable,
  ColumnConfig,
  ThemeContext,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "grommet";
import { NotFound, LoadingPage } from "../../components";
import { User } from "../../models";
import ColumnHeader from "./ColumnHeader";
import { colors } from "../../constants";
import { getUsersByPage, UsersResponse } from "./usersListViewApi";

// Columns for the DataTable
const columns: ColumnConfig<User>[] = [
  {
    property: "id",
    header: <ColumnHeader title="ID" />,
    primary: true,
  },
  {
    property: "avatar",
    header: <ColumnHeader title="User" />,
    render: (datum: User) => (
      <Box pad={{ vertical: "medium" }}>
        <Avatar src={datum.avatar} />
      </Box>
    ),
  },
  {
    property: "email",
    header: <ColumnHeader title="Email" />,
  },
  {
    property: "first_name",
    header: <ColumnHeader title="Name" />,
  },
  {
    property: "last_name",
    header: <ColumnHeader title="Surname" />,
  },
];

export default function UsersListView() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({
    page: String(page),
  });
  const [usersResponse, setUsersResponse] = useState<UsersResponse>();
  const totalPages = usersResponse?.total_pages ?? 2;
  const [isLoading, setIsLoading] = useState(true);
  const [pageNonexistent, setPageNonexistent] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const usersResponse = await getUsersByPage({ page });
      if (!usersResponse) {
        setIsLoading(false);
        return;
      }
      const { data } = usersResponse;
      setUsersResponse(data);
      setIsLoading(false);
    };
    fetch();
  }, [page]);

  useEffect(() => {
    const setNextPage = (page: number) => {
      setSearchParams({ page: String(page) });
      setPage(page);
    };
    const pageFromURL = searchParams.get("page");
    if (Number(pageFromURL) < 1 || Number(pageFromURL) > totalPages) {
      setPageNonexistent(true);
    }
    setNextPage(Number(pageFromURL));
  }, [searchParams, setSearchParams, page, totalPages]);

  const setNextPage = (page: number) => {
    setSearchParams({ page: String(page) });
    setPage(page);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!usersResponse?.data) {
    return <NotFound message="Sorry your page was not found!" />;
  }

  return (
    <>
      <Box>
        <ThemeContext.Extend
          value={{
            table: {
              row: {
                hover: { color: colors.primary },
              },
            },
          }}
        >
          <Card margin="large" elevation="large" animation="fadeIn">
            <CardHeader pad="medium" background={{ color: colors.primary }}>
              <Text size="large" weight="bold">
                Users Dashboard
              </Text>
            </CardHeader>
            <CardBody>
              {pageNonexistent ? (
                <NotFound message="This is not the users page you're looking for." />
              ) : (
                <DataTable
                  border={{
                    body: "bottom",
                  }}
                  sortable={true}
                  columns={columns}
                  data={usersResponse.data}
                  onClickRow={({ datum }) => {
                    navigate(`/users/${datum.id}`);
                  }}
                />
              )}
            </CardBody>
            <CardFooter pad="medium" background={{ color: colors.primary }}>
              {pageNonexistent ? (
                <Pagination numberItems={0} page={page} />
              ) : (
                <Pagination
                  numberItems={usersResponse.data.length}
                  step={3}
                  page={page}
                  onChange={({ page }: { page: number }) => {
                    setNextPage(page);
                  }}
                />
              )}
            </CardFooter>
          </Card>
        </ThemeContext.Extend>
      </Box>
      <Outlet />
    </>
  );
}
