const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'A product must have a name.']
    },
    productDescription: {
        type: String,
        required: [true, 'A product must have a description.']
    },
    productMedia: {
        type: [String],
        required: [true, 'A product must have one or more images.']
    },
    productPrice: {
        type: Number,
        required: [true, 'A product must have a price.']
    },
    productCompareAtPrice: {
        type: Number,
        default: null
    },
    productInventory: [
        {
            inventoryQuantity: {
                type: Number,
                default: 0
            },
            trackByCustomers: {
                type: Boolean,
                default: false
            }
        }
    ],
    productVariants: [
        {
            variantName: String,
            variantDescription: String,
            variantPrice: {
                type: Number
            },
            variantInventory: {
                type: Number
            },
            variantInventoryTrack: {
                type: Boolean
            }
        }
    ],
    productStatus: {
        type: Boolean,
        required: [true, 'A product need a status. Active / Deactive.'],
        default: true
    },
    productCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductCategory'
    },
    productRating: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    vendor: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: {
        type: mongoose.Schema.ObjectId,
        ref: 'Review'
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

/* productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
}); */

productSchema.pre(/^find/, function(next){
    this.populate({
        path: 'createdBy',
        select: 'userNameSurname email phoneNumber'
    }).populate({
        path: 'productCategory',
        select: 'productCategoryTitle'
    })
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;