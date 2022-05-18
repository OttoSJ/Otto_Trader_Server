const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    make: {
      type: String,
      required: [true, "Please add make"],
    },
    model: {
      type: String,
      required: [true, "Please add model"],
    },

    year: {
      type: Number,
      required: [true, "Please use numbers only"],
    },

    type: {
      type: String,
      required: [true, "Please add type, truck, car.."],
    },
    listprice: {
      type: Number,
      required: [true, "Please use numbers only"],
    },
    color: {
      type: String,
      required: true,
    },
    drivetype: {
      type: String,
      required: false,
    },
    engine: {
      type: String,
      required: false,
    },
    transmission: {
      type: String,
      required: false,
    },
    discription: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
      default:
        "https://ouikar.com/pub/media/catalog/product/placeholder/default/image_not_available.png",
    },
    mileage: {
      type: Number,
      required: [true, "Please add mileage"],
    },
    // Comfort Features
    ac: {
      type: String,
      default: "false",
    },
    leatherseats: {
      type: String,
      default: "false",
    },
    sunroof: {
      type: String,
      default: "false",
    },
    // Tech Features
    bluetooth: {
      type: String,
      default: "false",
    },
    cruisecontrol: {
      type: String,
      default: "false",
    },
    // Entertainment
    satradio: {
      type: String,
      default: "false",
    },
    auxport: {
      type: String,
      default: "false",
    },
    amfm: {
      type: String,
      default: "false",
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
