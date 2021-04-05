import React, { useState } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../store/action";
import { InputGroup, FormControl, Button, Container, Row } from "react-bootstrap";

function Search({getTasks}) {

   const [search, setSearch] = useState('');
   
   const handleSubmit = () => {
      const params = {
         search,
      };
      getTasks(params);

   };

   return (

      <Container>
         <Row className="justify-content-center">
            <InputGroup size="xs" className="mt-5 mb-4">
               <FormControl
                  placeholder="Filter"

                  onChange={(event) => setSearch(event.target.value)}
               />
               <InputGroup.Append

               >

                  <Button
                     as={InputGroup.Append}
                     variant="primary"
                     onClick={handleSubmit}
                  >Search</Button>

               </InputGroup.Append>
            </InputGroup>
         </Row>
         </Container >


     );

 }

 const mapDispatchToProps={
            getTasks,
}

export default connect(null,mapDispatchToProps)(Search);