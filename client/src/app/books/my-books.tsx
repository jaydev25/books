import { Flex, Space, Table, message } from 'antd';
const { Column, ColumnGroup } = Table;

import { myBooks, unPublishBook } from './../../services/book';
import { useEffect, useState } from 'react';

export const MyBooks = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState<any>({ page: 1, limit: 10 });

  const successMessage = (text: any) => {
    messageApi.info(text);
  };

  const errorMessage = (error: any) => {
    messageApi.error(error);
  };
  const [books, setBooks] = useState([]);

  const fetchMyBooks = async (page: any, limit: any) => {
    try {
      const resp = await myBooks(page, limit);
      const { docs, ...rest } = resp.data;

      setBooks(docs);
      setPagination(rest);
    } catch (error: any) {
      errorMessage(error);
    }
  };

  useEffect(() => {
    fetchMyBooks(pagination.page, pagination.limit);
  }, []);

  return (
    <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
      {contextHolder}
      <div>
        {books.length > 0 && (
          <Table dataSource={books}  pagination={{
            defaultPageSize: pagination.limit,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30'],
            total: pagination.totalDocs,
          }}
          onChange={(e) => {
            fetchMyBooks(e.current, e.pageSize);
          }}>
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Description" dataIndex="desc" key="desc" />
            <Column
              title="Author"
              dataIndex="author"
              key="author.firstName"
              render={(_: any, record: any) => (
                <Space size="middle">
                  {`${record.author.firstName} ${record.author.lastName}`}
                </Space>
              )}
            />
            <Column
              title="Action"
              key="action"
              render={(_: any, record: any) => (
                <Space size="middle">
                  <a
                    style={{ color: 'red' }}
                    onClick={() => {
                      unPublishBook(record._id).then(() => {
                        setBooks((state) => {
                          return state.filter((b: any) => record._id !== b._id);
                        });
                        successMessage('Book Unpublished Successfully!');
                      }).catch((error) => {
                        errorMessage('Somthing went wrong!');
                      });
                    }}
                  >
                    Unpublish
                  </a>
                </Space>
              )}
            />
          </Table>
        )}
      </div>
    </Flex>
  );
};
