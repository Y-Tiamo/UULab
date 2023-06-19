import { SOURCE_DEFAULT_DEVICE } from "../common/ImageSource";

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
}

const mock = new DeviceData();

export default mock;
