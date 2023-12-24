import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';

//dealing with the data in here!


@Injectable()
export class ItemsService {
   constructor(@InjectModel('Item') private readonly itemModel:Model<Item>){}
    async findAll():Promise<Item[]>{
        return await this.itemModel.find()
    }
    async findOne(id:string):Promise<Item>{
     return await this.itemModel.findOne({_id:id})
    }
    async createItem (item:Item):Promise<Item>{
    const newItem = new this.itemModel(item)
    return await newItem.save();
    }
    async removeItem(id: string): Promise<Item | null> {
        try {
          // Attempt to find and delete the item, using the lean option
          const deletedItem = await this.itemModel.findByIdAndDelete(id).lean().exec();
      
          if (!deletedItem) {
            // If no item was found with the given ID, return null 
            return null;
          }
      
          
          return deletedItem as Item;
        } catch (error) {
          
          throw new Error(`Error deleting item: ${error.message}`);
        }
      }
    async editItem(id:string,newItem:Item):Promise<Item>{
      return await this.itemModel.findByIdAndUpdate(id,newItem,{new:true})
       
    }  
      
}
