import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const sortValueToField = <O extends object>(value: string) => {
  const [field, order] = value.split('_');
  return {
    [field]: order
  } as O;
};

export const makePagination = (take: number, skip: number): IOffsetPaginationInfoDto => {
  return {
    take,
    skip,
    hasNext: false,
    hasPrevious: skip > 0,
    total: 0,
    count: 0
  };
};

export const queryToPagination = async (searchParams: URLSearchParams, limit: number = 15, defaultTake = 5): Promise<IOffsetPaginationInfoDto> => {
  let take = defaultTake;
  let skip = 0;

  const queryValidator = withZod(
    z.object({
      take: z.coerce.number().int().positive().max(limit).optional(),
      skip: z.coerce.number().int().nonnegative().optional(),
    })
  );

  const {data} = await queryValidator.validate(
    searchParams
  );

  if (data?.take) {
    take = data.take;
  }

  if (data?.skip) {
    skip = data.skip;
  }

  return makePagination(take, skip);
};
