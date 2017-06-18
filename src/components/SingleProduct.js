import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Breadcrumbs from './Breadcrumbs';
import Select from './Select';
import Price from './Price';
import { responsive } from '../styles';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`;

const StyledHalf = styled.div`
  width: 50%;
  @media (${responsive.md.min}) {
    width: 100%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.h1`
  font-weight: 700;
`;

const StyledOptions = styled.div`
  padding: 10px;
`;

const renderVariations = variants =>
  variants.map(variant => (
    <Select
      onChange={({ target }) => this.setState({ options: { [variant.name]: target.value } })}
      emptyOption={variant.name}
      options={variant.options}
    />
  ));


class SingleProduct extends Component {
  state = {
    options: {}
  }
  render() {
    const { product } = this.props;
    return (
      <StyledContainer>
        <Breadcrumbs
          category={product.category}
          pathname={product.pathname}
          productName={product.productName}
        />
        <StyledHalf>
          <StyledImage src={product.imageUrl} />
        </StyledHalf>
        <StyledHalf>
          <StyledTitle>{product.productName}</StyledTitle>
          <Price unitPrice={product.unitPrice} />
          <StyledOptions>
            {renderVariations(product.variants)}
          </StyledOptions>
        </StyledHalf>
      </StyledContainer>
    );
  }
}

SingleProduct.propTypes = {
  product: PropTypes.object.isRequired
};

export default SingleProduct;