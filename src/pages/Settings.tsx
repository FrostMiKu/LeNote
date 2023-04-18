import { Typography } from "antd";

const { Title, Text } = Typography;

const Settings = () => {
    return (
        <div className='bg-white mt-16 sm:mx-8 md:mx-16 p-8 shadow-md rounded-md'>
            <Title level={3}>todo</Title>
        </div>
    );
};

export default Settings;