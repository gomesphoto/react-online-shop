import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Breadcrumbs from '../components/Breadcrumbs';
import Select from '../components/Select';
import Price from '../components/Price';
import Quantity from '../components/Quantity';
import AddToCart from '../components/AddToCart';
import Wrapper from '../components/Wrapper';
import { modalShow } from '../redux/_modal';
import { cartUpdate } from '../redux/_cart';
import { responsive, fonts, colors } from '../styles';

const StyledHalf = styled.div`
  width: 50%;
  @media (${responsive.sm.max}) {
    width: 100%;
  }
`;

const StyledInfo = styled(StyledHalf)`
  padding: 0 25px;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledTitle = styled.h1`
  font-weight: 700;
`;

const StyledVariant = styled.span`
  font-size: ${fonts.h5};
  font-weight: 700;
  padding-right: 10px;
`;

const StyledDescription = styled.p`
  width: 100%;
`;

const StyledOptions = styled.div`
  margin: 10px 0;
`;

const StyledSizeChart = styled.span`
  cursor: pointer;
  color: rgb(${colors.dark});
  -webkit-appearance: none;
  background: none;
  text-align: left;
  margin-left: 10px;
`;

class ProductSingle extends Component {
  state = {
    quantity: 1
    // variant options will be populated here
  }
  componentDidMount = () => {
    if (Object.keys(this.props.product).length) {
      const productVariants = this.getVariants(this.props.product.variants);
      this.setState(productVariants);
    }
  }

  onVariantChange = (variant, option) =>
    this.setState({ [variant]: option });

  onQuantityChange = quantity =>
    this.setState({ quantity });

  onCartAdd = () => {
    this.props.cartUpdate(this.props.product, this.state);
  }

  getVariants = (variants) => {
    const productVariants = {};
    variants.map(variant => productVariants[variant.name] = variant.options[0]);
    return productVariants;
  };

  toggleSizeModal = () => {
    this.props.modalShow('SIZE_CHART_MODAL');
  }

  renderVariants = variants =>
    variants.map(variant => (
      <div key={`label-${variant.name}`}>
        <StyledVariant>{variant.name}</StyledVariant>
        <Select
          required
          key={variant.name}
          dark
          onChange={({ target }) => this.onVariantChange(variant.name, target.value)}
          options={variant.options}
        />
        {
          (variant.name.toLowerCase() === 'size')
          && <StyledSizeChart onClick={this.toggleSizeModal}>Size Chart</StyledSizeChart>
        }
      </div>
    ));

  render() {
    if (Object.keys(this.props.product).length) {
      const {
        productName,
        category,
        pathname,
        unitPrice,
        description,
        variants,
        imageUrl
      } = this.props.product;
      return (
        <Wrapper key={`product-${productName}`}>
          <Breadcrumbs
            category={category}
            pathname={pathname}
            productName={productName}
          />
          <StyledHalf>
            <StyledImage src={imageUrl} />
          </StyledHalf>
          <StyledInfo>
            <StyledTitle>{productName}</StyledTitle>
            <Price unitPrice={unitPrice} />
            <StyledDescription>
              {description}
            </StyledDescription>
            <StyledOptions>
              {this.renderVariants(variants)}
            </StyledOptions>
            <Quantity onChange={this.onQuantityChange} />
            <AddToCart onClick={this.onCartAdd} />
          </StyledInfo>
        </Wrapper>
      );
    }
    return null;
  }
}

ProductSingle.propTypes = {
  product: PropTypes.object,
  cartUpdate: PropTypes.func.isRequired,
  modalShow: PropTypes.func.isRequired
};

ProductSingle.defaultProps = {
  product: {}
};

export default connect(null, { cartUpdate, modalShow })(ProductSingle);
