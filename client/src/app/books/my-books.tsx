import { Flex, Space, Table, message } from 'antd';
const { Column, ColumnGroup } = Table;

import { myBooks, unPublishBook } from './../../services/book';
import { useEffect, useState } from 'react';

export const MyBooks = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (text: any) => {
    messageApi.info(text);
  };

  const errorMessage = (error: any) => {
    messageApi.error(error);
  };
  const [books, setBooks] = useState([]);

  const fetchMyBooks = async () => {
    try {
      const resp = await myBooks();

      setBooks(resp.data);
    } catch (error: any) {
      errorMessage(error);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <Flex style={{ margin: 'auto', flexDirection: 'column' }}>
      {contextHolder}
      <div>
        {books.length > 0 && (
          <Table dataSource={books}>
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
