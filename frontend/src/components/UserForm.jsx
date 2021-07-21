import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Upload, Button, Checkbox, message } from 'antd';
import axios from 'axios';

const { Option } = Select;


const UserForm = () => {

    const [tariffs, setTariffs] = useState([])
    const [file, setFile] = useState();
    const [fileList, setFilelist] = useState([]);

    const handleFileChange= file=>{
        switch (file.file.status) {
            case "uploading":
                setFilelist([file.file]);
                break;
            case "done":
                setFile(file.file)
                setFilelist([file.file]);
                break;

            default:
                // error or removed
                setFile(null);
                setFilelist([]);
        }
    }

    const cutomRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 500);
    };

    useEffect(()=>{
        axios({
            url: '/api/v1/tariffs'
        }).then(res=>{
            setTariffs(res.data);
        }).catch(()=>{
            message.error("Could not fetch tariffs!");
        })
    },[])

    const submitHandler = values=>{
        const { name, image, tariff_id, is_active } = values;
        console.log(values);
        let formData = new FormData();
        formData.append("name", name);
        formData.append("is_active", +is_active);
        formData.append("tariff_id", tariff_id);
        formData.append("image", image?.file?.originFileObj)

        axios({
            url: 'api/v1/users',
            method: 'post',
            data: formData,
        }).then(res=>{
            res.data.success ?
                message.success("User created successfully!")
                : message.error(res.data.error);
        }).catch(e=>{
            console.log(e);
            message.error("Failed to create a user!");
        })
    }

    return (
        <div>
            <Form
            onFinish={submitHandler}
            name="user-create-form"
            >
                <Form.Item
                name="name"
                key="name"
                >
                    <Input required placeholder="Name"/>
                </Form.Item>

                <Form.Item
                name="tariff_id"
                key="tariff_id"
                >
                    <Select  placeholder="Tariff">
                        {   
                            tariffs.map(item=><Option value={item.id} key={item.id}>{item.name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item 
                name="image"
                key="image"
                >
                    <Upload 
                    customRequest={cutomRequest}
                    fileList={fileList}
                    onChange={handleFileChange}
                    maxCount={1}
                    accept=".png,.jpg,.jpeg"
                    >
                        <Button>Upload image</Button>
                    </Upload>
                </Form.Item>
                <label>Is active?</label>
                <Form.Item
                name="is_active"
                key="is_active"
                valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" block>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserForm
