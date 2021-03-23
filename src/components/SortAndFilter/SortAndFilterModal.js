
import React,{useState} from "react";
import { connect } from "react-redux";
import sliceDate  from "../../additional_function/slice";
import { getTasks } from "../store/action";
import { Modal, Form, Button,DropdownButton,Dropdown,InputGroup, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
function SortAndFilterModal(props) {

    const [status, setStatus] = useState({
        name: "Status",
       
    });

    const [sort, setSort] = useState({
      name: "Sort",
     
  });

  const [dates, setDates] = useState({
    create_lte:null,
    create_gte:null,
    complete_lte:null,
    complete_gte:null,

 });

    const filterByTimeOptions = [
        {
            value: "create_lte",
            lable: "Created after",
        },
        {
            value:"create_gte",
            lable:"Created before",
        },
        {
            value: "complete_lte",
            lable: "Complate after",
        },
        {
            value:"complete_gte",
            lable:"Complate before",
        }
    ];

   
     const statusOptions=[
        {
            lable:"All",
    
         },
    {
        lable:"Done",
        value:"done",

     },
     {
        lable:"Active",
        value:"active"

     },
     
    ];
     const sortOptions=[
      {
         lable:"Default",
 
      },
        {
            lable:"A-Z",
            value:"a-z",
    
         },
         {
            lable:"Z-A",
            value:"z-a",
    
         },
         {
            lable:"Creation date newest",
            value:"creation_date_newestne",
    
         },
         {
            lable:"Creation date oldest",
            value:"creation_date_oldest",
    
         },
         
         {
            lable:"Completion date newest",
            value:"completion_date_newestne",
    
         },
          
         {
            lable:"Completion date oldest",
            value:"completion_date_oldest",
    
         },
     ]
   
    const handleChangeDate=(name,value)=>{
       
        setDates({
         ...dates,
            [name]:value,
        })
     }

     const handelSelectStatus=(option)=>{
        setStatus({
            ...status,
            name:option.lable,
            value:option.value
        })
     }

     const handelSelectSort=(option)=>{
      setSort({
          ...sort,
          name:option.lable,
          value:option.value
      });
   };
  

   const searchFunction=()=>{
      const params={
          sort:sort.value,
          status:status.value,
      };

    for (const key in dates) {
        if(dates[key]) {
            
            params[key]=sliceDate(dates[key].toISOString());
        }
    }
      props.getTasks(params);
      props.onClose();

   };
   
    return (
        <>
            <Modal
    show={true}
         
                size="xs"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sort  And Filter
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body
                >
 <InputGroup.Append
 
 className='mb-4 mt-2'>
                        <DropdownButton
      as={InputGroup.Append}
      variant="outline-primary"
      title={status.name==="All"?"Status":status.name}
      id="input-group-dropdown-2"
    >
      {statusOptions.map((option,i)=>{
          return(
         <Dropdown.Item 
         onSelect={()=>{handelSelectStatus(option)}}
         key={i}
         active={option.lable===status.name}
         >{option.lable}</Dropdown.Item>
          );
     })}
     
    </DropdownButton>
 
    <DropdownButton
      as={InputGroup.Append}
      variant="outline-primary"
      title={sort.name==="Default"?"Sort":sort.name}
      id="input-group-dropdown-2"
    >
       { sortOptions.map((option,i)=>{
          return(
         <Dropdown.Item 
         onSelect={()=>{handelSelectSort(option)}}
         key={i}
         >{option.lable}</Dropdown.Item>
          );
     })}
    </DropdownButton>
    </InputGroup.Append>
    
                    {filterByTimeOptions.map((option,i)=>{
                        return(
                              <Form.Group as={Row}
                              key={i}>
                        <Form.Label 
              
                        column sm={4}>
                            {option.lable}
                        </Form.Label>
                        <Col sm={8}>
                            <DatePicker 
                            onChange={(value)=>handleChangeDate(option.value,value)}
                            selected={dates[option.value]}
                            />

                        </Col>

                    </Form.Group>
                        );
                    })}
                  
                    
                </Modal.Body>
                <Modal.Footer>

                    <Button 
                    variant='success' 
                    onClick={searchFunction}
                    
                    >Search</Button>
                    <Button  onClick={props.onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
const mapDispatchToProps={
    getTasks,
 }
 export default connect(null,mapDispatchToProps)(SortAndFilterModal); 