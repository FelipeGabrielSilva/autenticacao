import { AbilityBuilder, PureAbility } from "@casl/ability";
import { PrismaQuery, Subjects, createPrismaAbility } from "@casl/prisma";
import { Injectable } from "@nestjs/common";
import { Post as PrismaPost, User } from "@prisma/client";
import { Action } from "../authorization/action.type";

type AppAbility = PureAbility<[string, 'all' | Subjects<{
    User: User,
    Post: PrismaPost,
}>], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

        if (user.isAdmin) {
            can(Action.Manage, 'all');
        } else {
            cannot(Action.Create, 'Post');
            cannot(Action.Read, 'Post');
            can(Action.Update, 'Post', { authorId: user.id });
            cannot(Action.Delete, 'Post', { authorId: user.id });
        }

        return build();
    }
}
