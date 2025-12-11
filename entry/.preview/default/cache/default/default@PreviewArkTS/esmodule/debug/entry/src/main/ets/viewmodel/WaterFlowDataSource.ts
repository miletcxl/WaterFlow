import ProductItem from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/ProductItem";
import type { IProductItem } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/ProductItem";
/**
 * Water flow data source.
 */
export class WaterFlowDataSource implements IDataSource {
    private dataArray: ProductItem[] = [];
    private listeners: DataChangeListener[] = [];
    /**
     * Set water flow data array.
     *
     * @param {IProductItem[]} productDataArray Displaying water flow Data.
     */
    public setDataArray(productDataArray: IProductItem[]): void {
        // Convert IProductItem[] to ProductItem[]
        this.dataArray = productDataArray.map((item: IProductItem) => {
            return new ProductItem(item);
        });
        // Notify all listeners that data has changed
        this.listeners.forEach((listener: DataChangeListener) => {
            listener.onDataReloaded();
        });
    }
    /**
     * Get the total number of data records.
     */
    public totalCount(): number {
        return this.dataArray.length;
    }
    /**
     * Get the data corresponding to the index.
     *
     * @param {number} index Data index.
     * @returns Return ProductItem.
     */
    public getData(index: number): ProductItem {
        return this.dataArray[index];
    }
    /**
     * Register a controller that changes data.
     *
     * @param {DataChangeListener} listener Data change listener
     */
    registerDataChangeListener(listener: DataChangeListener): void {
        if (this.listeners.indexOf(listener) < 0) {
            this.listeners.push(listener);
        }
    }
    /**
     * Register a controller that changes data.
     *
     * @param {DataChangeListener} listener  Data change listener
     */
    unregisterDataChangeListener(listener: DataChangeListener): void {
        let pos = this.listeners.indexOf(listener);
        if (pos >= 0) {
            this.listeners.splice(pos, 1);
        }
    }
}
