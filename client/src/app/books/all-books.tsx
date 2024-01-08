import { Flex, Input, Space, Table, message } from 'antd';
const { Column, ColumnGroup } = Table;
import { UserOutlined, SearchOutlined } from '@ant-design/icons';

import { searchBooks } from './../../services/book';
import { useEffect, useState } from 'react';

export const AllBooks = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (text: any) => {
    messageApi.info(text);
  };

  const errorMessage = (error: any) => {
    messageApi.error(error);
  };
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const searchBooksWithTitle = async (title: any) => {
    try {
      const resp = await searchBooks(title);

      setBooks(resp.data);
    } catch (error: any) {
      errorMessage(error);
    }
  };

  useEffect(() => {
    searchBooksWithTitle(search);
  }, [search]);

  return (
    <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
      {contextHolder}
      <Flex>
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Flex>
      <Flex>
        {books.length > 0 && (
          <Table dataSource={books} style={{ width: '100%'}}>
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
          </Table>
        )}
      </Flex>
    </Flex>
  );
};
