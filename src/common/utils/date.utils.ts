export class DateUtils {
    /**
     * 将对象中的时间转换为时间戳
     * @param obj 对象
     * @returns 转换后的对象
     */
    public static convertDatesToTimestamps(obj: any): any {
        if (obj instanceof Date) {
            return obj.getTime();
        }
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        for (const key in obj) {
            if (obj[key] instanceof Date) {
                obj[key] = obj[key].getTime();
            }
        }
        return obj;
    }
}
