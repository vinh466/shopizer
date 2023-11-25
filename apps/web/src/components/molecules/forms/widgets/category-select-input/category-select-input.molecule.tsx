import { Button, Modal } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { EditOutlined, RightOutlined } from '@ant-design/icons';
import { set } from 'lodash';

interface SelectItem {
  value: string;
  label: string;
  isDisable: boolean;
  children: SelectItem[];
}

type TreeList = Array<SelectItem>;

interface CategorySelectInputProps {
  value?: Select;
  onChange?: (value: Select) => void;
  treeList?: TreeList;
}

type Select = {
  value: string;
  label: string;
  isLeaf: boolean;
}[];

export function CategorySelectInput(props: CategorySelectInputProps) {
  const [select, setSelect] = useState<Select>([]);
  const [selected, setSelected] = useState<Select>([]);
  const [selectList, setSelectList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (props.onChange) {
      props.onChange(select);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setSelect(selected);
    setOpen(false);
  };

  const handleChooseItem = (
    value: string,
    label: string,
    deep: number,
    isLeaf: boolean,
  ) => {
    console.log(select);
    const newSelect = [...select];
    newSelect.splice(deep);
    newSelect[deep] = {
      value: value,
      label: label,
      isLeaf,
    };
    console.log(newSelect);
    setSelect(newSelect);
  };

  useEffect(() => {
    console.log('props.valu', props.value);
    setSelect(props.value || []);
    setSelected(props.value || []);
  }, [props.value]);

  useEffect(() => {
    const createList = (
      list: TreeList,
      values: string[],
      listSelect: any = [],
    ) => {
      list?.findIndex((item) => {
        if (listSelect.length === 0) listSelect.push(list);
        if (values.includes(item.value)) {
          listSelect.push(item.children || []);
          if (item.children) {
            createList(item.children, values, listSelect);
          }
          return true;
        }
      });
      return listSelect;
    };

    const newList = createList(
      props.treeList || [],
      select?.map((item) => item.value) || [],
    );

    setSelectList(newList);
  }, [select, props.treeList]);

  return (
    <div className="category-select-input">
      <Button
        className={classNames('select-btn', {
          selected: selected.length > 0,
        })}
        type="default"
        onClick={showModal}
      >
        {selected?.length > 0 ? (
          <div className="d-flex justify-content-between">
            <span>{selected?.map((item) => item.label).join(' > ')}</span>{' '}
            <EditOutlined />
          </div>
        ) : (
          <div
            className="d-flex justify-content-between"
            style={{ color: '#aaa' }}
          >
            Chọn ngành hàng <EditOutlined />
          </div>
        )}
      </Button>
      <Modal
        open={open}
        width={1000}
        className="category-select-modal"
        title="Chọn ngành hàng"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="footer" key="footer">
            <div className="d-flex justify-content-between">
              <div>
                <span>Ngành hàng đã chọn: </span>
                <span className="fw-bold">
                  {select?.map((item) => item.label).join(' > ')}
                </span>
              </div>
              <div className="action">
                <Button onClick={handleCancel}>Hủy</Button>
                <Button
                  type="primary"
                  onClick={handleOk}
                  disabled={!select?.find((item) => item.isLeaf)}
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>,
        ]}
      >
        <div className="select-list custom-scroll">
          {selectList?.map((item, colIndex) => {
            if (item.length === 0) return null;
            return (
              <div className="select-list-col custom-scroll" key={colIndex}>
                {item.map((item: any, itemIndex: number) => {
                  const isLeaf = !item.children || item.children.length === 0;
                  return (
                    <Button
                      type="text"
                      className={classNames('select-list-item', {
                        active: select
                          ?.map((item) => item.value)
                          .includes(item.value),
                      })}
                      key={item.value}
                      onClick={() =>
                        handleChooseItem(
                          item.value,
                          item.label,
                          colIndex,
                          isLeaf,
                        )
                      }
                    >
                      <span
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                        title={item.label}
                      >
                        {item.label}
                      </span>
                      {!isLeaf && <RightOutlined />}
                    </Button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Modal>
      <style jsx global>{`
        .ant-form-item-has-error {
          .category-select-input {
            & button {
              border-color: red;
            }
          }
        }
        .category-select-input {
          .select-btn {
            width: 100%;
            text-align: left;
            color: #aaa !important;

            &.selected {
              color: #333 !important;
            }
          }
        }
        .category-select-modal {
          .ant-modal-content {
            .ant-modal-header {
              padding-bottom: 8px;
              margin-bottom: 8px;
              font-size: 16px;
              font-weight: 500;
              line-height: 22px;
              color: #333;
              border-bottom: 1px solid #f0f0f0;
            }
            .ant-modal-body {
              height: calc(90vh - 200px);
              max-height: 800px;
              .select-list {
                height: 100%;
                overflow-y: auto;
                display: flex;

                .select-list-col {
                  padding: 8px 4px;
                  border-right: 1px solid #f0f0f0;
                  min-width: 300px;
                  border-bottom: 1px solid #f0f0f0;
                  overflow-y: auto;
                  .select-list-item {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    span {
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 22px;
                      color: #333;
                    }
                  }
                  .select-list-item.active {
                    font-weight: 700;
                    color: #1890ff;
                  }
                }
              }
            }
            .ant-modal-footer {
              padding-top: 12px;
              margin-top: 12px;
              border-top: 1px solid #f0f0f0;

              .action {
                button {
                  margin-left: 8px;
                }
              }
            }
          }
          .custom-scroll {
            &::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            &::-webkit-scrollbar-track {
              border-radius: 8px;
              background-color: #e7e7e7;
            }

            &::-webkit-scrollbar-thumb {
              border-radius: 8px;
              background-color: #8b8b8b;
            }
          }
        }
      `}</style>
    </div>
  );
}
