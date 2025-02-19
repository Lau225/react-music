import React from 'react'
import {Button, ConfigProvider, Image} from 'antd';
import './index.less'
const Index = () => {
    return (
    <div style={{width:'100%'}}>
        <Image preview={false} src="https://music.163.com/style/web2/img/dis_vip_card.png" style={{ width:"248px",height:"89px",cursor:"pointer" }}/>
        <div className="login-card-content">
            <span style={{fontSize:"12px",color:"#666666"}}>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultBg:"rgb(210,9,15)",
                            defaultColor:"#fff",
                            defaultHoverBg:"rgba(193,9,14,0.8)",
                            defaultBorderColor:"rgba(193,9,14)",
                            defaultHoverColor:"#fff",
                            defaultHoverBorderColor:"rgba(193,9,14)",
                            defaultActiveBg:"rgba(193,9,14,0.8)",
                            defaultActiveColor:"#fff",
                            defaultActiveBorderColor:"rgba(193,9,14)",
                        },
                    },
                }}
            >
               <Button style={{ height:"31px",width:"100px",marginLeft:"25%",fontSize:"12px",marginTop:"13px" }}>用户登录</Button>
            </ConfigProvider>
        </div>
    </div>
  )
}
export default Index;
