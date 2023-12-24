import { Controller,Get ,Post,Put,Delete,Body,Param} from '@nestjs/common';
import {CreateItemDto} from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
//contains the end points
@Controller('items')
export class ItemsController {
    // this where we inject dependances
    constructor(private readonly itemsService:ItemsService){}
    @Get()
     findAll():Promise<Item[]>{
   return this.itemsService.findAll()
    }
    @Get(':id')
     findOnde(@Param() param):Promise<Item>{
        return this.itemsService.findOne(param.id)
    }
    @Post()
     create(@Body() createItemDto:CreateItemDto):Promise<Item>{
        
        return this.itemsService.createItem(createItemDto); ;
    }
    @Delete(':id')
    deleteItem(@Param('id') id):Promise<Item>{ 
    return this.itemsService.removeItem(id); 
    }
    @Put(':id')
    update(@Body() updateItemDto:CreateItemDto,@Param('id') id):Promise<Item>{
        return this.itemsService.editItem(id,updateItemDto)
    }
}
