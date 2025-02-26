export interface userNotificationInfo{
    lessons:[{
        startDate:Date,
        name:string,
        finalDate:Date,
    }],
    exams:[{
        date:Date,
        type:string,
    }]
}