﻿export const CpuData_mock = {
    resultCode: "100",
    detailDescription: "计算资源-堆叠柱状图数据",
    resultContent: {
    "thx": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    "zone": [
        {
            name: "可用区1",
            series: [
                {
                    name: '2core',
                    data: [0.06, 0.08, 0.08, 0.09, 0.1,0.12, 0.15],
                },
                {
                    name: '4core',
                    data: [0.08, 0.09, 0.1, 0.12, 0.14, 0.18, 0.2],

                },
                {
                    name: '8core',
                    data: [0.1, 0.12, 0.15, 0.18, 0.2, 0.2, 0.22],
                },

            ],
            total:[1000,1000,1000,1000,1000,1200,1500,2000]
        },
        {
            name: "可用区2",
            series: [
                {
                    name: '2core',
                    data: [0.065, 0.065, 0.065, 0.065, 0.065,0.065, 0.065],
                },
                {
                    name: '4core',
                    data: [0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16],
                },
                {
                    name: '8core',
                    data: [0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22],
                },

            ],
            total:[1000,1000,1000,1000,1000,1200,1500,2000]
        }
         
    ]

}
}

//按主机
export const VmData_mock = {
    resultCode: "100",
    detailDescription: "计算资源-按主机-堆叠柱状图数据",
    resultContent: {
    "thx": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    "zone": [
        {
            name: "可用区1",
            series: [
                {
                    name: '2core',
                    data: [0.06, 0.07, 0.08, 0.09, 0.1,0.11, 0.12],
                },
                {
                    name: '4core',
                    data: [0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13],

                },
                {
                    name: '8core',
                    data: [0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14],
                },

            ],
            total:[1000,1000,1000,1000,1000,1200,1500,2000]
        },
        {
            name: "可用区2",
            series: [
                {
                    name: '2core',
                    data: [0.065, 0.065, 0.065, 0.075, 0.075,0.075, 0.075],
                },
                {
                    name: '4core',
                    data: [0.16, 0.16, 0.16, 0.18, 0.18, 0.18, 0.18],
                },
                {
                    name: '8core',
                    data: [0.22, 0.22, 0.22, 0.24, 0.24, 0.24, 0.24],
                },

            ],
            total:[1000,1000,1000,1000,1000,1200,1500,2000]
        }
         
    ]

}
}

//按内存
export const MemData_mock = {
    resultCode: "100",
    detailDescription: "计算资源-按内存-堆叠柱状图数据",
    resultContent: {
    "thx": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    "zone": [
        {
            name: "可用区1",
            series: [
                {
                    name: '2core',
                    data: [0.06, 0.08, 0.08, 0.09, 0.1,0.12, 0.15],
                },
                {
                    name: '4core',
                    data: [0.08, 0.09, 0.1, 0.12, 0.14, 0.18, 0.2],

                },
                {
                    name: '8core',
                    data: [0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18],
                },

            ],
            total:[1000,1000,1000,1000,1000,1200,1500,2000]
        },
        {
            name: "可用区2",
            series: [
                {
                    name: '2core',
                    data: [0.065, 0.065, 0.065, 0.065, 0.065,0.065, 0.075],
                },
                {
                    name: '4core',
                    data: [0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.18],
                },
                {
                    name: '8core',
                    data: [0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.24],
                },

            ],
            total:[1000,1000,1000,1000,1000,1200,1500,2000]
        }
         
    ]

}
}