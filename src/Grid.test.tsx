import {beforeEach, describe, expect, test} from 'vitest';
import {fireEvent, render, screen } from '@testing-library/react';
import Grid from './Grid';
import "@testing-library/jest-dom";

describe("Accordion", () => {

    beforeEach(() => {
        render(<Grid size={3}></Grid>);
    });

    test("should make cell alive on clicking on it", () => {
       
        const cell = screen.getByTestId('1-1');
        expect(cell).toHaveClass('dead');
        fireEvent.click(cell);
        expect(cell).toHaveClass('alive');
    })
    
})