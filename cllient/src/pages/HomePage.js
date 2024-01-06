import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd'
import Layout from '../components/Layout'
import axios from 'axios';
import 'antd/dist/antd.js'; // Import the Ant Design CSS
import Spinner from '../components/Spinner';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Analytics from '../components/Analytics';
import {backend_url} from '../services';
const { RangePicker } = DatePicker;

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelecteddate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null)
  const [update, setupdate]=useState(false)
  const [del,setdelete]=useState(false)
  const [edit,setedit] =useState(false)
  //table data


  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Reference",
      dataIndex: "refrence"
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record);
            setShowModal(true);
          }} />
          <DeleteOutlined className='mx-2'
            onClick={() => 
              { handleDelete(record) }}
          />
        </div>
      ),
    },

  ];




  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post(`${backend_url}/get-transection`, {
          userid: user._id, frequency, selectedDate, type
        });
       

        setAllTransaction(res.data);
        setLoading(false)
        //console.log(res.data);

      }
      catch (error) {
        message.error("Fetch Issue with Transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type,setAllTransaction]);



  //handldelete

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      console.log(record._id);
      await axios.post(`${backend_url}/delete-transection`, {
        transactionId: record._id
      })
      setLoading(false);
      
      message.success("Transaction Deleted");
    }
    catch (error) {
      setLoading(false)
      console.log(error);
      message.error('unable to delete')

    }
  };

  //form handlling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      // console.log(user);
      setLoading(true)

      if (editable) {
        // console.log(editable._id);
        // console.log(user._id);
        await axios.post(`${backend_url}/edit-transection`, {
          payload: {
            ...values,
            userid: user._id,
          }, transactionId: editable._id,
        });
        setLoading(false);
        
        message.success("Transaction Updated successfully")
      }
      else {
        await axios.post(`${backend_url}/add-transection`, { 
          ...values,
           userid: user._id });
        setLoading(false);
        message.success("Transaction added successfully")


      }
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields")
    }

  };


  return (
    <>
      <Layout>
        {loading && <Spinner />}
        <div className='filters'>
          <div>
            <h6>Select Frequency</h6>

            <Select value={frequency} onChange={(values) => setFrequency(values)}>
              <Select.Option value="7">LAST 1 Week</Select.Option>
              <Select.Option value="30">LAST 1 Month</Select.Option>

              <Select.Option value="365">LAST 1 Year</Select.Option>

              <Select.Option value="custom">Custom</Select.Option>

            </Select>
            {frequency === "custom" && (<RangePicker value={selectedDate}
              onChange={(values) => setSelecteddate(values)} />)}
          </div>


          {/* //type select */}
          <div>
            <h6>Select Type</h6>

            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>

              <Select.Option value="expense">EXPENSE</Select.Option>

            </Select>
            {frequency === "custom" && (<RangePicker value={selectedDate}
              onChange={(values) => setSelecteddate(values)} />)}
          </div>

          <div className='switch-icons'>
            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
              onClick={() => setViewData('table')} />
            <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
              onClick={() => setViewData('analytics')} />
          </div>

          <div>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add new</button>
          </div>
        </div>
        <div className='content'>

          {viewData === "table" ?
            (<Table columns={columns} dataSource={allTransection} />) :
            (<Analytics allTransection={allTransection} />)}
        </div>

        <Modal
          title={editable ? "Edit Transaction" : "Add Transaction"} open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >

          <Form layout="vertical" onFinish={handleSubmit} initialValues={editable} >

            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>

            <Form.Item label="Reference" name="refrence">
              <Input type="text" required/>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input type="text" required/>
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <button type="submit" className='btn btn-primary'>
                {" "}
                SAVE
              </button>
            </div>
          </Form>

        </Modal>

      </Layout>
    </>
  )
}

export default HomePage;






















