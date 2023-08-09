const {
  YooCheckout,
  IGetPaymentList,
  ICapturePayment,
} = require("@a2seven/yoo-checkout");

const checkout = new YooCheckout({
  shopId: 681227,
  secretKey: "live_mtWDs-vADGTmkz5d53xExEYPw7pcaOUIVO506CjI2pY",
});

const paymentIds = [
  "29ea0579-000f-5000-a000-1cf9a52ee674",
  "29e75450-000f-5000-9000-18985c6650b9",
];

const idempotenceKey = "02347fc4-a1f0-49db-807e-f0d67c2ed5a5";

const paymentId = "29d391e0-000f-5000-9000-11dd58bc668d";

const filters = {
  created_at: { value: "2022-03-27T13:58:02.977Z", mode: "gte" },
  limit: 10,
};

async function f() {
  try {
    // const paymentList = await checkout.getPaymentList(filters);
    // let r = paymentList.items.filter((p) => paymentIds.includes(p.id));
    const payment = await checkout.getPayment(paymentId);

    console.log("payment", payment);
  } catch (error) {
    console.error("error", error);
  }
}

f();

// node capturePayment.js
