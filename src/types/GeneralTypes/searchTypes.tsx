export interface SearchOrderItem {
    id: number;
    store_id: number;
    user_id: number;
    order_id: number;
    service_name: string;
    no_of_items: number;
    photos: string;
    type: string;
    created_at: string;
    updated_at: string;
    status: number;
    online_status: string | null;
    order_number: number;
    item_type: string;
    order: {
      id: number;
      store_id: number;
      user_id: number;
      customer_id: number;
      ref: string;
      order_type: number;
      total_amount: number;
      paid_amount: number;
      order_code: number;
      pickup_date: string;
      payment_type: string;
      balance: number;
      status: number;
      online_status: string | null;
      created_at: string;
      updated_at: string;
      order_number: number;
      customer: {
        id: number;
        name: string;
        phone_number: string;
        email: string;
      };
    };
  }
  
  export interface SearchOrderResponse {
    success: boolean;
    message: string;
    result: SearchOrderItem[];
  }
  