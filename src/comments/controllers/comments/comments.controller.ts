import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from 'src/comments/services/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dtos/CreateComment.dto';
import { UpdateCommentDto } from 'src/comments/dtos/UpdateComment.dto';
import { Comment } from 'src/typeorm/entities/Comment';
import { JwtAuthGuard } from 'src/guards/guards/jwt-auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the create method
    async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentsService.create(createCommentDto);
    }

    @Get()
    async findAll(): Promise<Comment[]> {
        return await this.commentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Comment> {
        return await this.commentsService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the update method
    async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return await this.commentsService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the remove method
    async remove(@Param('id') id: string): Promise<void> {
        await this.commentsService.remove(+id);
    }
}
