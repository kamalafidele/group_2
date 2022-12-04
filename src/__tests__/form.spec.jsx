import React from 'react'
import { mount } from 'enzyme'
import Form from '../components/Form'

describe('<Form>', () => {
  it('Should capture firstname correctly onChange', () => {
    const component = mount(<Form />)
    const input = component.find('input').at(0)
    input.instance().value = 'hello'
    input.simulate('change')
    expect(component.state().firstname).toEqual('hello')
  })

  it('Should capture lastname correctly onChange', () => {
    const component = mount(<Form />)
    const input = component.find('input').at(1)
    input.instance().value = 'world'
    input.simulate('change')
    expect(component.state().lastname).toEqual('world')
  })

  it('Should capture email correctly onChange and change the props accordingly', () => {
    const component = mount(<Form />)
    const input = component.find('input').at(2)

    input.instance().value = 'mail@hotmail.com'
    input.simulate('change')
    expect(component.find('input').at(2).props().value).toEqual('mail@hotmail.com')
  })

  it('Should capture email correctly onChange and change the state accordingly', () => {
    const component = mount(<Form />)
    const input = component.find('input').at(2)
    input.instance().value = 'mail@hotmail.com'
    input.simulate('change')
    expect(component.state().email).toEqual('mail@hotmail.com')
  })

  it('Should capture multi select languages correctly onChange', () => {
    // For multi select, set the individual option's selected property to true
    const component = mount(<Form />)
    const input = component.find('select').at(0)
    const optionEnglish = component.find('option').at(0)
    optionEnglish.instance().selected = true
    const optionGerman = component.find('option').at(3)
    optionGerman.instance().selected = true
    input.simulate('change')

    expect(component.find('select').at(0).props().value).toEqual(['English', 'German'])
  })

  it('Should capture checkbox ticked correctly onChange', () => {
    const component = mount(<Form />)
    const input = component.find('input').at(3)
    input.instance().checked = true
    input.simulate('change')
    expect(component.state().subscribed).toEqual(true)
  })

  it('Should call alert() when submit button is clicked', () => {
    const state = {
      firstname: 'hello',
      lastname: 'world',
      email: 'hello@world.com',
      languages: ['English', 'French'],
      subscribed: true,
    }
    const expectedArg = 'Firstname: hello, Lastname: world, Email: hello@world.com, Language: English,French, Subscribed: Yes'
    const component = mount(<Form />)
    window.alert = jest.fn()
    component.setState(state)

    component.find('form').simulate('submit')
    expect(window.alert).toHaveBeenCalledWith(expectedArg)
  })
})
