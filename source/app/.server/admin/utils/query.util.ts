import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';

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
