export enum RabbitMQ {
    TRANSACTIONQueue = 'ms-transbank',
}

export enum transbankrMsg {
    CREATE = 'CREATE_TRANSACTION',
    CONFIRM = 'CONFIRM_TRANSACTION',
    CANCEL = 'CANCEL_TRANSACTION'
}