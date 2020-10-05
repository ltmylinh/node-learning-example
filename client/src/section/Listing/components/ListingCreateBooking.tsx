import React from 'react';
import { Button, Card, Divider, Typography, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { displayErrorMessage, formatListingPrice } from '../../../lib/utils';

const { Paragraph, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  const disabledDate = (currentDate?: Moment) => {
    if (currentDate) {
      const dateIsBeforeEndToday = currentDate.isBefore(moment().endOf('day'));
      return dateIsBeforeEndToday;
    } else {
      return false;
    }
  };

  const verifyAndSetCheckoutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, 'days')) {
        return displayErrorMessage(
          'You can not book date of check out to be prior to check in!'
        );
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  return (
    <div className='listing-booking'>
      <Card className='listing-booking__card'>
        <div>
          <Paragraph>
            <Title level={2} className='listing-booking__card-title'>
              {formatListingPrice(price)}
            </Title>
          </Paragraph>
          <Divider />
          <div className='listing-booking__card-date-picker'>
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate}
              format='YYYY/MM/DD'
              onChange={(dateValue) => setCheckInDate(dateValue)}
              disabledDate={disabledDate}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div className='listing-booking__card-date-picker'>
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate}
              format='YYYY/MM/DD'
              disabledDate={disabledDate}
              showToday={false}
              disabled={!checkInDate}
              onChange={(dateValue) => verifyAndSetCheckoutDate(dateValue)}
            />
          </div>
        </div>
        <Divider />
        <Button
          size='large'
          type='primary'
          className='listing-booking__card-cta'
          disabled={!checkInDate || !checkOutDate}
        >
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
