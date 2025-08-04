import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './ModalFormTodoStyle.module.css'
import { addTodoHandler } from '../../utils/todoHandler'

const { TextArea } = Input

export const ModalFormTodo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const showModal = () => setIsModalOpen(true)

  const handleAdd = (values) => {
    addTodoHandler(values, dispatch)
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <div>
      <Button onClick={showModal}>Добавить задачу</Button>
      <Modal
        title="Добавить новую задачу"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="Добавить"
        cancelText="Закрыть"
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Введите заголовок' }]}
          >
            <Input placeholder="Заголовок" />
          </Form.Item>
          <Form.Item name="description">
            <TextArea placeholder="Описание" className={styles.textArea} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}