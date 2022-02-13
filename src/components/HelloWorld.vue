<template>
<div>
  <header>
    <!-- Navbar -->
    <MDBNavbar expand="lg" light bg="white" container>
      <MDBNavbarToggler target="#navbarExample01"></MDBNavbarToggler>
      <MDBNavbarNav collapse="navbarExample01" class="mb-2 mb-lg-0">
        <MDBNavbarItem to="#" active>
          Home
        </MDBNavbarItem>
        <MDBNavbarItem to="#">
          Features
        </MDBNavbarItem>
        <MDBNavbarItem to="#">
          Pricing
        </MDBNavbarItem>
        <MDBNavbarItem to="#">
          About
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBNavbar>
    <!-- Navbar -->
    <!-- Jumbotron -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Store Items</h1>
      <h4 class="mb-3">Subheading</h4>
      <a class="btn btn-primary" href="" role="button"
        >Call to action</a
      >
    </div>
    <!-- Jumbotron -->
  </header>
<div v-if="storeitems.length">
  <MDBRow :cols="['1','md-4']" class="g-4">
  <div v-bind:key="storeitem.index" v-for="storeitem in storeitems">
    <MDBCol>
      <MDBCard>
        <MDBCardImg :src="imageLink + storeitem.image" top alt="..."/>
        <MDBCardBody>
          <MDBCardTitle>{{storeitem.title}}</MDBCardTitle>
          <MDBCardText>
            {{storeitem.description}}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </div>
  </MDBRow>
  </div>
</div>
</template>
<script>
import { MDBNavbar, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImg } from 'mdb-vue-ui-kit';
export default {
  name: 'HelloWorld',
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImg
  },
  data(){
    return {
      storeitems: [],
      imageLink: "https://strapi-dqn1.onrender.com/api/storeitems"
    }
  },
    mounted() {
    fetch("https://strapi-dqn1.onrender.com/api/storeitems")
      .then((res) => res.json())
      .then((data) => {
        this.storeitems = data;
      });
  }
}
</script>