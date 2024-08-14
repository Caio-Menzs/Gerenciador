import React from 'react';
import { Button, Flex } from 'antd';


const CustomButton = ({ label, icon, onClick }) => (
  <Flex gap="small" wrap>
    <Button 
      type="primary" 
      style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }} 
      className='button' 
      icon={icon}
      onClick={onClick} 
    >
      Adicionar {label}
    </Button>
  </Flex>
);

export default CustomButton;
