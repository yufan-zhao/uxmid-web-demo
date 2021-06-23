/**
 * url集合
 * @interface
 */
export default interface IUrlCollection
{
    /**
     * url集合对象
     * @readonly
     */
    readonly collection: {[name: string]: string;};
}
