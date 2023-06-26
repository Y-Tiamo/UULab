import {
  SOURCE_DEFAULT_DEVICE,
  SOURCE_MESSAGE_EXIT_GROUP,
  SOURCE_MESSAGE_GROUP,
  SOURCE_MESSAGE_INSTRUMENT
} from "../common/ImageSource";

const data = [
  {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 1,//1运行中2维护3离线4故障
    fix_status:1,//1有维修0无维修
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 2,
    fix_status:1,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 3,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 4,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 1,
    fix_status:1,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 1,
    fix_status:0,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 1,
    fix_status:1,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 1,
    fix_status:1,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 1,
    fix_status:0,
    room: "之江实验室",
  }, {
    pic: SOURCE_DEFAULT_DEVICE,
    name: "基因测序文库制备仪",
    type: "Auto-NGS",
    no: "100R",
    PN: "23000001-1000001",
    status: 1,
    fix_status:1,
    room: "之江实验室",
  },
];

const messages={
  instrument_error:[{
    instrument_name:'仪器名称',
    lab_name:"科室名称",
    pn_number:'3123313234424-23132342434',
    protocol_name:'程序名称',
    instrument_account:'操作员',
    error_code:'故障原因',
    time:'2023年06月26日，上午10:11',
  }],
  maintain :[{
    instrument_name:'仪器名称',
    lab_name:"科室名称",
    pn_number:'3123313234424-23132342434',
    note:'维护类型',
    time:'2023年06月26日，上午10:11',
  }],
  run_start :[{
    instrument_name:'仪器名称',
    lab_name:"科室名称",
    pn_number:'3123313234424-23132342434',
    protocol_name:'程序名称',
    instrument_account:'操作员',
    time:'2023年06月26日，上午10:11',
  }],
  run_finish :[{
    protocol_name:'程序名称',
    lab_name:"科室名称",
    pn_number:'3123313234424-23132342434',
    instrument_account:'操作员',
    begin_time:'2023年06月26日，上午10:11',
    end_time:'2023年06月26日，上午10:11',
  }],
  run_stop :[{
    protocol_name:'程序名称',
    lab_name:"科室名称",
    pn_number:'3123313234424-23132342434',
    instrument_account:'操作员',
    note:'线上终止',
    time:'2023年06月26日，上午10:11',
  }],
  instrument_shutdown :[{
    instrument_name:'仪器名称',
    lab_name:"科室名称",
    pn_number:'3123313234424-23132342434',
    time:'2023年06月26日，上午10:11',
  }],
  exit_group :[{
    icon: SOURCE_MESSAGE_EXIT_GROUP,
    title: '退出群聊',
    color: "#8C9AB5",
    message:{},
    unread_count:0
  }],
  group_message :[{
    icon: SOURCE_MESSAGE_GROUP,
    title: '群消息',
    color: "#8C9AB5",
    message:{},
    unread_count:0
  }],
  instrument_apply:[{
    icon: SOURCE_MESSAGE_INSTRUMENT,
    title: '仪器',
    color: "#8C9AB5",
    message:{},
    unread_count:0
  }],
}

class DeviceData {
  getDeviceByType(status) {
    let list = [];
    if (status === 0) {
      list = data;
    } else {
      data.map(item=>{
        if (item.status === status) {
          list.push(item);
        }
      })
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { data: list, total: list.length } });
      });
    });
  }

  getMessagesByType(type){
    console.log('getMessagesByType',type)
    let list=messages[type]||[]
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { data: list, total: list.length } });
      });
    });
  }
}

const mock = new DeviceData();

export default mock;
