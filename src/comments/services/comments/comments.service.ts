import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/typeorm/entities/Comment';
import { CreateCommentDto } from 'src/comments/dtos/CreateComment.dto';
import { UpdateCommentDto } from 'src/comments/dtos/UpdateComment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const newComment = this.commentRepository.create(createCommentDto);
        return await this.commentRepository.save(newComment);
    }

    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.find();
    }

    async findOne(id: number): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ CommentID: id });
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }
        return comment;
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.findOne(id);
        this.commentRepository.merge(comment, updateCommentDto);
        return await this.commentRepository.save(comment);
    }

    async remove(id: number): Promise<void> {
        const comment = await this.findOne(id);
        await this.commentRepository.remove(comment);
    }
}
