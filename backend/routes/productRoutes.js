const express = require('express');
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();


router.use('/:productId/reviews', reviewRouter);

router
    .route('/')
    // Only admins and staffs can create products
    .post(
        authController.protect,
        authController.permit('admin'),
        productController.getUser,
        productController.createProduct)
    .get(
        authController.protect,
        authController.permit('admin'),
        productController.getProducts)


// Showcase Router (All Products)
router.route('/showcase').get(productController.getAllProductsShowcase);
// Detailed Product Router for One Product (Parameter: id)
router
    .route('/:id')
    .get(productController.getProductDetailed)
    .patch(
        authController.protect,
        authController.permit('admin'),
        productController.updateProduct
        );
// Showcase Router for One Product (Parameter: id)
router.route('/showcase/:id').get(productController.getProductShowcase);



module.exports = router;