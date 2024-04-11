import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Task = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  return (
    <div className="task">
      <Container fluid>
        <Row >
          <Col xs={1}>
            <input type="checkbox" className="form-check-input" checked={todo.completed} onChange={() => onToggleCompleted(todo._id)} />
          </Col>
          <Col>
            <label className="form-check-label">
              {todo.text}
            </label>
          </Col>
          <Col xs={1}>
            <Button className='buttonCustom' onClick={() => onDeleteTodo(todo._id)}>X</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Task;
